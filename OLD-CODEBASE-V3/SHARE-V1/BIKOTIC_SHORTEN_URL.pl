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

#check access code..
if(&detaint($q->param('ac') ne "d6r5k4j8g1"))
{
	print "FAIL";
	exit;
}

#connect..
&connectToMySQL();

#get the url parameters sent..
my $urlParams = &detaintKeepCommas($q->param('url_params'));

#var for the cid..
my $cid = "x";

#make a code and check its unique..
my $impossible = "true";
for(my $i = 0; $i < 10; $i++)
{
	#make a random char(8)..
	$cid = join '', map { ('a'..'z', 'A'..'Z', 0..9)[rand 62] } 0..7;
	
	#check the cid doesnt already exist..
	my $check = &queryMySQL($dbh, "SELECT id FROM short_url WHERE BINARY id = '$cid'", 1);
	
	#check if a match returned..
	if(!defined $check){ $impossible = "false"; last;}
}

#check the impossible..
if($impossible eq "true")
{
	print "FAIL, Try again";
	
	#disconnect from db..	
	$dbh->disconnect;
	
	exit;
}

#hit the db..
&queryMySQL($dbh, "INSERT INTO short_url SET id = '$cid', parameters = '$urlParams'", 0);

print $cid;

#disconnect from db..	
$dbh->disconnect;	

	#my @x = $elapsed*1000;
	#&saveFile("TEST.txt", \@x);
	
exit;




