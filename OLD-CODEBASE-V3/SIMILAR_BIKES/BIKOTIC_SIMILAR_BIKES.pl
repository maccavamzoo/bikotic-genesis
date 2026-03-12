#!/usr/bin/perl

#PERL START UP..
use strict;
use CGI ':standard';
my $q = new CGI;

#PRINT HEADER..
print $q->header( -type => 'text/html');

use DBI();

#load subs..
require '../PRL-SWORK/BIKOTIC_subs.pl';
our $dbh;

#connect..
&connectToMySQL();

my $id = &detaint($q->param('id'));

#get the recent bike info..
my $bikes = &queryMySQL_Multi($dbh, "SELECT
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
								FROM bikes
								WHERE bike_type_sub = (SELECT bike_type_sub FROM bikes WHERE id = $id) 
								    AND id != $id 
								    AND publish = 1 
								ORDER BY SQRT(
								    POW(price - (SELECT price FROM bikes WHERE id = $id), 2) +
								    POW(geo_formula - (SELECT geo_formula FROM bikes WHERE id = $id), 2)
								)
								LIMIT 10;", 1);

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
	my $date = $array_ref->[2];
	
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
		~battery_wh~:~$battery_wh~,
		~date~:~$date~
	  },";
		
}

if($json eq '{"bikes":['){print "void"; $dbh->disconnect; exit;}

#get json ready..
$json =~ s/~/"/g;
chop($json);

$json = $json . "]}";

print $json;
	
$dbh->disconnect;			
exit;
