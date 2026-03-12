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

my $title = &detaint($q->param('title'));

&queryMySQL($dbh, "INSERT INTO shootout_views SET title = \"$title\"", 0);

$dbh->disconnect;			
exit;


