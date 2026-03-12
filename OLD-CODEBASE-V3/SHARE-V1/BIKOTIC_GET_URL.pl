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

#get the url parameters sent..
my $cid = &detaint($q->param('cid'));

#get the parameters that match cid..
my $check = &queryMySQL($dbh, "SELECT parameters FROM short_url WHERE BINARY id = '$cid'", 1);
	
#check if a match returned..
if(!defined $check){print "FAIL";}
else
{
	#send back the params..
	print $check->{"parameters"};
	
	#update the hits ticker on the db entry for the url..
	&queryMySQL($dbh, "UPDATE short_url SET hits = hits + 1 WHERE BINARY id = '$cid'", 1);
}

#disconnect from db..	
$dbh->disconnect;	

	#my @x = $elapsed*1000;
	#&saveFile("TEST.txt", \@x);
	
exit;




