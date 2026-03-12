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

#get the user code..
my $user_code = "BIKOTIC 2.5";
my $email = &detaint($q->param('email'));
my $message = &detaint($q->param('message'));

#hit the db..
my $confirm = &queryMySQL_Multi($dbh, "INSERT INTO messages SET user_code = '$user_code', message = '$message', bikotic_reply = 0, email = '$email'", 1);

print "MESSAGE SENT, THANKS!";

#disconnect from db..	
$dbh->disconnect;	

	#my @x = $elapsed*1000;
	#&saveFile("TEST.txt", \@x);

		
exit;
