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
my $id = &detaint($q->param('id'));

#hit the db..
my $sth = &queryMySQL_Multi($dbh, " SELECT *, DATE_FORMAT(CONVERT_TZ(time_date, @\@session.time_zone, '+00:00'), '%d %b %Y %h:%i %p') AS gmt_time_date
									FROM comments
									WHERE model_id = $id
									ORDER BY time_date DESC
									", 1);
my $comments = $sth->fetchall_arrayref({});

#Iterate through the results and access the fields..
my $output = "";
my $count = scalar @$comments;

foreach my $comment (@$comments)
{
	my $isitme = $comment->{'is_it_me'};
	my $date_time = $comment->{'gmt_time_date'}; # current date and time
	my $cmmnt = $comment->{'comment'}; # the comment to display
	my $processed_comment = make_links_clickable($cmmnt);
	
	my $bkg_color = "#ffffff";
	if($isitme)
	{
		$bkg_color = "#ebedf9";
		$processed_comment = "BIKOTIC: " . $processed_comment;
	}
	
	# Generate the HTML code with the desired formatting and store it in $output
	$output .= "<div class=\"container\" style=\"border: 1px solid #ddd; display: block; border-radius: 10px; margin-top: 10px; padding:15px; padding-left:5px; background-color:" . $bkg_color . ";\">\n";
	$output .= "  <div class=\"column-1\" style=\"width: 40px; float: left; margin: 4px; margin-top:-6px;\">\n";
	$output .= "    <div class=\"circle\" style=\"text-align: center; font-size: 14px; border-radius: 50%; width: 30px; height: 30px; line-height: 30px; background-color: #fff; border: 1px solid #ddd;\">$count</div>\n";
	$output .= "  </div>\n";
	$output .= "  <div class=\"column-2\" style=\"margin-left: 35px; overflow: hidden;\">\n";
	$output .= "    <div class=\"datetime\" style=\"font-size: 12px; color:#a274a1;\">". $date_time ."</div>\n"; # Display current date and time
	$output .= "    <div class=\"comment\" style=\"font-size: 18px;\">$processed_comment</div>\n";
	$output .= "  </div>\n";
	$output .= "</div>\n";

	$count--;
}

#add the bottom spacer..
$output = $output . "<DIV style=\"width:100%; height:390px\"></DIV>";

print $output;

#disconnect from db..	
$dbh->disconnect;	

	#my @x = $elapsed*1000;
	#&saveFile("TEST.txt", \@x);

		
exit;

sub make_links_clickable {
  my $text = shift;
  
  $text =~ s{(https?&#58;&#47;&#47;\S+)}{<a href="$1" target="_blank" style="color:#a274a1;text-decoration:none">$1</a>}g;

  return $text;
}









