#!/usr/bin/perl

#PERL START UP..
use strict;
use CGI ':standard';
my $q = new CGI;

#PRINT HEADER..
print $q->header( -type => 'text/html');

use DBI();

#load subs..
require 'BIKOTIC_subs.pl';
our $dbh;

#connect..
&connectToMySQL();
my $sth;

my $id = &detaint($q->param('id'));

my $bikeItem = &queryMySQL($dbh, "
    SELECT 
        b.*, 
        m.name AS manufacturer_name, 
        w.make AS wheel_make, 
        w.name AS wheel_name, 
        w.weight AS wheel_weight, 
        w.price AS wheel_price, 
        t.make AS tyre_make,
        t.name AS tyre_name,
        t.weight AS tyre_weight,
        t.price AS tyre_price,
        g.make AS groupset_make, 
        g.name AS groupset_name, 
        (
            SELECT COUNT(*) 
            FROM comments 
            WHERE model_id = b.id
        ) AS bike_comment_count 
    FROM 
        bikes b 
        LEFT JOIN manufacturers m ON b.manufacturer_id = m.id 
        LEFT JOIN wheels w ON b.wheels_id = w.id 
        LEFT JOIN tyres t ON b.tyres_id = t.id 
        LEFT JOIN groupset g ON b.group_id = g.id 
    WHERE 
        b.id = $id
", 1);


#make image names..
my $imageName = $bikeItem->{"data_collection_date"};
$imageName =~ s/[-: ]+//g;

my $json;
eval
{
	#turn info into JSON..
	$json = '
	{
		"image_name":"'				. $imageName . '",
		"id":"'						. $bikeItem->{"id"} . '",
		"manufacturer_id":"'		. $bikeItem->{"manufacturer_id"} . '",
		"model_id":"'				. $bikeItem->{"model_id"} . '",
		"color":"'					. $bikeItem->{"color"} . '",
		"clearance":"'				. $bikeItem->{"clearance"} . '",
		"data_collection_date":"'	. $bikeItem->{"data_collection_date"} . '",
		"link":"' 					. $bikeItem->{"link"} . '",
		"affiliate_link":"' 		. $bikeItem->{"affiliate_link"} . '",
		"bike_type_main":"' 		. $bikeItem->{"bike_type_main"} . '",
		"bike_type_sub":"' 			. $bikeItem->{"bike_type_sub"} . '",
		"brake_type":"' 			. $bikeItem->{"brake_type"} . '",
		"model_year":"' 			. $bikeItem->{"model_year"} . '",
		"manufacturer":"' 			. $bikeItem->{"manufacturer_name"} . '",
		"model_des":"' 				. $bikeItem->{"model_des"} . '",
		"groupset":"' 				. $bikeItem->{"groupset_make"} . " " . $bikeItem->{"groupset_name"} . '",
		"price":"' 					. $bikeItem->{"price"} . '",
		"weight":"' 				. $bikeItem->{"weight"} . '",
		"photo_frame_size":"' 		. $bikeItem->{"photo_frame_size"} . '",
		"geo_size":"' 				. $bikeItem->{"geo_size"} . '",
		"wheel_size":"' 			. $bikeItem->{"wheel_size"} . '",
		"fork_material":"' 			. $bikeItem->{"fork_material"} . '",
		"frame_material":"' 		. $bikeItem->{"frame_material"} . '",
		"suspension_travel_front":"'. $bikeItem->{"suspension_travel_front"} . '",
		"suspension_front":"'		. $bikeItem->{"suspension_front"} . '",
		"suspension_travel_rear":"'	. $bikeItem->{"suspension_travel_rear"} . '",
		"suspension_rear":"'		. $bikeItem->{"suspension_rear"} . '",
		"dropper":"'				. $bikeItem->{"dropper"} . '",
		"groupset_complete":"'		. $bikeItem->{"groupset_complete"} . '",
		"groupset_speed":"'			. $bikeItem->{"groupset_speed"} . '",
		"chainring_large":"'		. $bikeItem->{"chainring_large"} . '",
		"chainring_small":"'		. $bikeItem->{"chainring_small"} . '",
		"cassette_large":"'			. $bikeItem->{"cassette_large"} . '",
		"cassette_small":"'			. $bikeItem->{"cassette_small"} . '",
		"power_meter":"'			. $bikeItem->{"power_meter"} . '",
		"wheels_make":"'			. $bikeItem->{"wheel_make"}  . '",
		"wheels_name":"'			. $bikeItem->{"wheel_name"} . '", 
		"wheels_weight":"'			. $bikeItem->{"wheel_weight"} . '", 
		"wheels_price":"'			. $bikeItem->{"wheel_price"} . '",	
		"mixed_wheels":"'			. $bikeItem->{"mixed_wheels"} . '",
		"tyres_make":"'				. $bikeItem->{"tyre_make"} . '",
		"tyres_name":"'				. $bikeItem->{"tyre_name"} . '",
		"tyres_weight":"'			. $bikeItem->{"tyre_weight"} . '",
		"tyres_price":"'			. $bikeItem->{"tyre_price"} . '",
		"tyres_width":"'			. $bikeItem->{"tyre_width"} . '",
		"mixed_tyres":"'			. $bikeItem->{"mixed_tyres"} . '",
		"horizontal_top_tube":"'	. $bikeItem->{"horizontal_top_tube"} . '",
		"reach":"'					. $bikeItem->{"reach"} . '",
		"stack":"'					. $bikeItem->{"stack"} . '",
		"wheelbase":"'				. $bikeItem->{"wheelbase"} . '",
		"head_angle":"'				. $bikeItem->{"head_angle"} . '",
		"chainstay":"'				. $bikeItem->{"chainstay"} . '",
		"bb_drop":"'				. $bikeItem->{"bb_drop"} . '",
		"gal_pics":"'				. $bikeItem->{"gal_pics"} . '",
		"range_id":"'				. $bikeItem->{"range_id"} . '",
		"motor_nm":"'				. $bikeItem->{"motor_nm"} . '",
		"battery_wh":"'				. $bikeItem->{"battery_wh"} . '",
		"bkg_tone":"'				. $bikeItem->{"bkg_tone"} . '",
		"comment_count":"'			. $bikeItem->{"bike_comment_count"} . '",
		"loading":"'				. "false" . '",
		"notes":"'					. $bikeItem->{"notes"} . '"
	}
	';
};
if ($@) 
{
	print "An error occurred: $@";
	exit;
}

#send JSON back to browser..
print $json;

if($id != 16 && $id != 805 && $id != 973)
{
	#pop app version!..
	my $session_id = &detaint($q->param('session_id'));
	my $app_version = &detaint($q->param('app_version'));
	if($app_version eq "mobile")
	{
		&queryMySQL($dbh, "UPDATE bikes SET mobile_app = mobile_app + 1 WHERE id = $id", 0);
		&queryMySQL($dbh, "INSERT INTO session_stats SET session_id = $session_id, bike_id = $id, device = \"$app_version\"", 0);
	}
	elsif($app_version eq "desktop")
	{
		&queryMySQL($dbh, "UPDATE bikes SET desktop_app = desktop_app + 1 WHERE id = $id", 0);
		&queryMySQL($dbh, "INSERT INTO session_stats SET session_id = $session_id, bike_id = $id, device = \"$app_version\"", 0);
	}
}

$dbh->disconnect;			
exit;

#my @x = "INSERT INTO session_stats SET session_id = $session_id, bike_id = $id, device = \"$app_version\"";
#&saveFile("TEST.txt", \@x);

