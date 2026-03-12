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

#get the details..
my $isitme = &detaint($q->param('isitme'));
my $model_id = &detaint($q->param('model_id'));
my $comment = &detaint($q->param('comment'));

#hit the db..
my $confirm = &queryMySQL_Multi($dbh, "INSERT INTO comments SET model_id = $model_id, comment = '$comment', is_it_me = '$isitme'", 1);

print "done";

#disconnect from db..	
$dbh->disconnect;	

	#my @x = $elapsed*1000;
	#&saveFile("TEST.txt", \@x);

		
exit;
