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

#get the table info..
my $table = &detaint($q->param('table'));
	
#split the items..
my @items = split(/,/, $q->param('items')); 

#make the items string..
my $itemsStr = "";
for(my $i = 0; $i < scalar @items; $i++)
{
	$itemsStr = $itemsStr . &detaint(@items[$i]) . ",";
} chop($itemsStr);

#check if there is a where part to the query..
my $whereX = &detaint($q->param('whereX'));
my $whereY = &detaint($q->param('whereY'));  
if($whereX ne ""){$whereX = "where $whereX = $whereY";} 

#check if there is a AND where part to the query..
my $andX = &detaint($q->param('andX'));
my $andY = &detaint($q->param('andY'));  
if($andX ne ""){$andX = "and $andX = $andY";} 

#check the bike is published..
my $published = "";
if($table eq "bikes")
{
	my $showUnpublished = &detaint($q->param('showUnpulished'));
	
	#my @x = $showUnpublished;
	#&saveFile("TEST.txt", \@x);
	
	if($showUnpublished eq "yes")
	{
		$published = "and publish IN (0,1)";
	}
	else
	{
		$published = "and publish = 1";
	}
}

#run the query..
my $item1 = &detaint(@items[0]);
my $direction = &detaint($q->param('direction'));
$sth = &queryMySQL_Multi($dbh, "SELECT $itemsStr FROM $table $whereX $andX $published ORDER BY $item1 $direction", 1);		

	#my @x = "SELECT $itemsStr FROM $table $whereX $andX $published ORDER BY $item1 $direction";
	#&saveFile("TEST.txt", \@x);

#turn info into JSON..
my $options = "";
while (my $ref = $sth->fetchrow_hashref) 
{
	my $tmp = "{";		
	for(my $i = 0; $i < scalar @items; $i++)
	{
		$tmp = $tmp . '"' . @items[$i] . '":"' . uc($ref->{@items[$i]}) . '",';
	} chop($tmp);
	
	$tmp = $tmp . "},";
	$options = $options . $tmp;
}	
#remove last comma..
chop($options);

my $json = "{\"options\":[$options]}"; 

	#my @x = $json;
	#&saveFile("TEST.txt", \@x);

#send JSON back to browser..
print $json;
	
$dbh->disconnect;						
exit;

