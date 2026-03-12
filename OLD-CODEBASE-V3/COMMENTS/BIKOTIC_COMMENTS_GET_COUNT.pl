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

#get the bike id..
my $model_id = &detaint($q->param('model_id'));

#hit the db..
my $sth = &queryMySQL($dbh, "SELECT COUNT(*) AS count FROM comments WHERE model_id = $model_id", 1);

my $count = $sth->{"count"};
print $count;

#disconnect from db..	
$dbh->disconnect;	

	#my @x = $elapsed*1000;
	#&saveFile("TEST.txt", \@x);

		
exit;








