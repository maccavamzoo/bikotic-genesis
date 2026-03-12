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
my $sth;

#run the query..
$sth = &queryMySQL_Multi($dbh, "SELECT id, make, name, display_order FROM groupset ORDER BY display_order", 1);		

#make json output..
my $json = '{"groups":[';

while (my $array_ref = $sth->fetchrow_arrayref) 
{
	my $id = $array_ref->[0];
	my $make = $array_ref->[1];
	my $family = $array_ref->[2];
	
	$json = $json . "{
	
		~id~:$id,
		~make~:~$make~,
		~name~:~$family~
		
	  },";

}	

	#my @x = $json;
	#&saveFile("TEST.txt", \@x);

$json =~ s/~/"/g;
chop($json);
$json = $json . "]}";

print $json;
	
$dbh->disconnect;			
exit;
