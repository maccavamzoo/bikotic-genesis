#!/usr/bin/perl

#PERL START UP..
use strict;
use CGI ':standard';
my $q = new CGI;

#PRINT HEADER..
print $q->header( -type => 'text/html');

use DBI();

#load subs..
require '../BIKOTIC_subs.pl';
our $dbh;

#connect..
&connectToMySQL();


#hit the db..
my $clothingBrands = &queryMySQL_Multi($dbh, "SELECT * FROM clothing_brands ORDER BY rating DESC", 1);

my $total = 0;

#it jargon
my $txtBack = "";
while (my $array_ref = $clothingBrands->fetchrow_arrayref) 
{
	
	#add info to txt back..
	$txtBack = $txtBack . "
	
	<br> 
	<a href=\"$array_ref->[4]\" target=\"_blank\" style=\"text-decoration:none; color:#015669;\"><div style=\"font-size:20px; color:#333333; display:inline-block; padding-right:5px;\"><strong>$array_ref->[1]</strong></div><img src=\"https://bikotic.com/SLRGT/manLink.png\"></a>
	<div style=\"font-size:16px;\">Country: $array_ref->[5]</div>
	<div style=\"font-size:16px;\">Founded: $array_ref->[3]</div>
	<div style=\"font-size:14px; color:#333333;\"><strong>Notes:</strong> $array_ref->[2]</div>
	<br><div style=\"width:100%; height:1px; background-color:#999999;\"></div>";
	
	$total++;
}

print "<strong style=\"font-size:22px; color:#015669;\">Total brands in the database: $total</strong><br>" . $txtBack;

#disconnect from db..	
$dbh->disconnect;	

	#my @x = $elapsed*1000;
	#&saveFile("TEST.txt", \@x);

		
exit;
