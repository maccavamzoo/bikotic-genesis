#!/usr/bin/perl

use Time::HiRes qw(time);
my $start = time();

#PERL START UP..
use 5.010;
use strict;
use CGI ':standard';
my $q = new CGI;

#PRINT HEADER..
print $q->header( -type => 'text/html');

use DBI();
use JSON;

#load subs..
require '../PRL-SWORK/BIKOTIC_subs.pl';
our $dbh;

#connect..
&connectToMySQL();

#detaint the vars..
my $cheapestFlag = 0;
my $where = "";

my $man_search = &detaint($q->param('man_search'));
my $model_search = &detaint($q->param('model_search'));
my $bike_type = &detaint($q->param('bike_type'));
my $sub_type = &detaint($q->param('sub_type'));
my $groupset = &detaint($q->param('groupset'));
my $power_meter = &detaint($q->param('power_meter'));
my $sort = &detaint($q->param('sort'));
if($sort eq "none"){$sort = "ORDER BY model_year DESC, price DESC";}
if($sort eq "cheapest"){$sort = "ORDER BY price ASC"; $cheapestFlag = 1;}

if($sort eq "newest"){$sort = "ORDER BY model_year DESC, price DESC";}
if($sort eq "oldest"){$sort = "ORDER BY model_year ASC, price DESC";}

if($sort eq "hits"){$sort = "ORDER BY (mobile_app + desktop_app) DESC";}
if($sort eq "brakes"){$sort = "ORDER BY brake_type DESC, price DESC";}
if($sort eq "material"){$sort = "ORDER BY frame_material DESC, price DESC";}
if($sort eq "extraimages"){$sort = "ORDER BY gal_pics DESC, price DESC";}
if($sort eq "speed"){$sort = "ORDER BY groupset_speed DESC, price DESC";}
if($sort eq "motor"){$sort = "ORDER BY motor_nm DESC, price DESC";}
if($sort eq "battery"){$sort = "ORDER BY battery_wh DESC, price DESC";}
if($sort eq "bkg"){$sort = "ORDER BY bkg_tone ASC, price DESC";}

my $minPrice = "void";
if($q->param('minPrice') ne "void"){ $minPrice = &decimalDetaint($q->param('minPrice'));}
my $maxPrice = "void";
if($q->param('maxPrice') ne "void"){ $maxPrice = &decimalDetaint($q->param('maxPrice'));}

if($man_search ne ""){$where = "manufacturer_id IN (SELECT id FROM manufacturers WHERE name LIKE \"%$man_search%\") AND "};
if($model_search ne ""){$where = $where . "model_des LIKE \"%$model_search%\" AND "};
if($bike_type ne "void"){$where = $where . "bike_type_main = \"$bike_type\" AND ";}

if($sub_type ne "void")
{	
	$where = $where . "bike_type_sub = \"$sub_type\" AND ";
}

#groupo..
if($groupset ne "void")
{
	if($groupset eq "oneby")
	{
		$where = $where . "one_by = 1 AND ";
	}
	else
	{
		$where = $where . "group_id = \"$groupset\" AND ";
	}
}

if($power_meter eq "YES"){$where = $where . "power_meter != 'NO' AND ";}

#see if we have a price range to add to the query..
my $rangeTxt = "";
if($minPrice ne "void")
{
	 $rangeTxt = "price >= " . ($minPrice*1000.00);
}
if($maxPrice ne "void")
{
	if($rangeTxt ne ""){ $rangeTxt = $rangeTxt . " AND price <= " . ($maxPrice*1000.00); }
	else{ $rangeTxt = "price <=" . ($maxPrice*1000.00); }
}

if($rangeTxt ne ""){$where = $where . $rangeTxt . " AND price != -999999.00 AND ";}

#see if its just my list..
my $my_list = &detaintKeepCommas($q->param('my_list'));
if($my_list ne "")
{
	$where = $where . "id IN ($my_list) AND ";
}

#see if were searching a single year..
my $singleYear = &detaint($q->param('singleYear'));
if($singleYear ne "")
{
	$where = $where . "model_year = $singleYear AND ";
}

#see if sorting by cheapest, to get rid of -999999 bikes with no price..
if($cheapestFlag)
{
	$where = $where . "price > 0 AND ";
}

#i think were chopping the last AND off..
$where = substr($where, 0, -4);

#are we showing none published bikes?..
my $published = &detaint($q->param('published'));
my $publishedQuery = "AND publish = 1 ";
if($published eq "all")
{
	$publishedQuery = "";
}

#add the WHERE key word if needed..
if($where ne "")
{
	$where = "WHERE " . $where;
	
	#remove system entries - eg DUMMY..
	$where = $where . " AND id NOT IN(16,286) $publishedQuery";
}
else
{
	#remove system entries - eg DUMMY..
	$where = $where . "WHERE id NOT IN(16,286) $publishedQuery";
}

#add sort..
$where = $where . $sort;

	#my @x = $where;
	#&saveFile("TEST_JSON.txt", \@x); 

########################################################################PRE SEARCH..
#we need to do a pre search to find out how many bikes there are in each year..
my $searchString = "SELECT model_year FROM bikes $where";

#hit the db..
my $bikes = &queryMySQL_Multi($dbh, $searchString, 1);

#it the results..
my %years;
while (my $array_ref = $bikes->fetchrow_arrayref) 
{
	if(exists($years{$array_ref->[0]}))
	{
		$years{$array_ref->[0]}++;
	}
	else
	{
		$years{$array_ref->[0]} = 1;
	}
	
	
}

my $yearsJson = encode_json \%years;	
	
	

########################################################################PRE SEARCH..


#add limit..
my $limit_offset = &detaint($q->param('limit_offset'));
my $limit = &detaint($q->param('limit'));
if($limit > 0)
{
	$where = $where . " LIMIT " . $limit_offset . "," . $limit;
}

my $searchString = "SELECT 
						id, 
						model_des, 
						data_collection_date, 
						model_year, 
						model_id, 
						manufacturer_id,
						(SELECT name FROM manufacturers WHERE id = manufacturer_id),
						price, 
						weight, 
						value_formula, 
						geo_formula, 
						clearance, 
						mobile_app, 
						desktop_app,
						(SELECT make FROM groupset WHERE id = group_id),
						(SELECT name FROM groupset WHERE id = group_id),
						brake_type,
						frame_material,
						gal_pics,
						groupset_speed,
						bike_type_sub,
						range_id,
						motor_nm,
						battery_wh 
						FROM bikes $where";

	

#hit the db..
my $bikes = &queryMySQL_Multi($dbh, $searchString, 1);

#make json output..
my $json = '{"bikes":[';

#it the results..
while (my $array_ref = $bikes->fetchrow_arrayref) 
{
	
	#get the man name..
	my $manufacturer = $array_ref->[6];
	
	#make image names..
	my $imageName = $array_ref->[2];
	$imageName =~ s/[-: ]+//g;
	
	my $id = $array_ref->[0];
	my $model_des = $array_ref->[1];
	my $model_year = $array_ref->[3];
	my $model_id = $array_ref->[4];
	my $manufacturer_id = $array_ref->[5];
	my $price = $array_ref->[7]; 
	my $weight = $array_ref->[8]; 
	my $value_formula = $array_ref->[9]; 
	my $geo_formula = $array_ref->[10]; 
	my $clearance = $array_ref->[11]; 
	my $hits = $array_ref->[12] + $array_ref->[13]; 
	my $groupset = $array_ref->[14] . " " . $array_ref->[15];
	my $brake_type = $array_ref->[16];
	my $frame_material = $array_ref->[17];
	my $gal_pics = $array_ref->[18];
	my $groupset_speed = $array_ref->[19];
	my $bike_type = $array_ref->[20];
	my $range_id = $array_ref->[21];
	my $motor_nm = $array_ref->[22];
	my $battery_wh = $array_ref->[23];
	
	$json = $json . "{
	
		~id~:$id,
		~model_des~:~$model_des~,
		~imagename~:~$imageName~,
		~model_year~:~$model_year~,
		~model_id~:$model_id,
		~manufacturer_id~:$manufacturer_id,
		~price~:~$price~,
		~weight~:~$weight~,
		~value_formula~:~$value_formula~,
		~geo_formula~:~$geo_formula~,
		~clearance~:~$clearance~,
		~hits~:~$hits~,
		~manufacturer~:~$manufacturer~,
		~groupset~:~$groupset~,
		~brake_type~:~$brake_type~,
		~frame_material~:~$frame_material~,
		~gal_pics~:~$gal_pics~,
		~groupset_speed~:~$groupset_speed~,
		~bike_type~:~$bike_type~,
		~range_id~:~$range_id~,
		~motor_nm~:~$motor_nm~,
		~battery_wh~:~$battery_wh~
	  },";
		
}

if($json eq '{"bikes":['){print "void"; $dbh->disconnect; exit;}

#get json ready..
$json =~ s/~/"/g;
chop($json);

#stop the timer..
my $elapsed = sprintf("%.2f",(time() - $start)*1000);

$json = $json . "]}~" . $yearsJson . "~" . $elapsed;

print $json;
	
#disconnect from db..	
$dbh->disconnect;	

	#my @x = $elapsed*1000;
	#&saveFile("TEST.txt", \@x);

		
exit;
