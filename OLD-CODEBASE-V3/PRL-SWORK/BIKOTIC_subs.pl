#db..
our $debug = 1;

our $host = "DBI:mysql:database=kcira02_BIKOTIC;host=localhost";

our $DB_UserName = "kcira02_bikotic-admin";

our $DB_Password = 'cX*R{4MX29"Gk!C^';
our $dbh = "";

sub detaint #($_[0] : String) 
{      
	
	my @letters = qw(a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z _ -);
	my @numbers = qw(0 1 2 3 4 5 6 7 8 9 0);
	my @chars   = qw(` " £ $ % ^ & * ( ) _ + [ ] { } ; ' # : @ ~ \ | , . / < > ? !);
	my @charKey = qw(&#96; &#34; &#163; &#36; &#37; &#94; &#38; &#42; &#40; &#41; &#95; &#43; &#91; &#93; &#123; &#125; &#59; &#39; &#35; &#58; &#64; &#126; &#92; &#124; &#44; &#46; &#47; &#60; &#62; &#63; &#33;);
	
	
	
	#scan for bad chars..
	my $newString = "";
	for(my $i = 0; $i < length($_[0]); $i++)
	{
		
		#char to check..
		my $theChar = substr($_[0],$i,1);
		
		#check for space..
		if($theChar eq " "){$newString = $newString . $theChar; next;}
		
		#check thru letters..
		my $l = @letters; my $sorted = 0;
		for(my $j = 0; $j < $l; $j++)
		{
			if($theChar eq $letters[$j]){$newString = $newString . $theChar; $sorted = 1; last;}
		} if($sorted == 1){next;}
		
		#check thru numbers..
		my $l = @numbers; my $sorted = 0;
		for(my $j = 0; $j < $l; $j++)
		{
			if($theChar eq $numbers[$j]){$newString = $newString . $theChar; $sorted = 1; last;}
		} if($sorted == 1){next;}
		
		#check thru chars..
		my $l = @chars; my $sorted = 0;
		for(my $j = 0; $j < $l; $j++)
		{
			if($theChar eq $chars[$j]){$newString = $newString . $charKey[$j]; $sorted = 1; last;}
		} if($sorted == 1){next;}
		
		#all failed..
		$newString = $newString . " ";
		
	}
	
	return $newString;
	
}

sub decimalDetaint #($_[0] : String) 
{      
	my @numbers = qw(0 1 2 3 4 5 6 7 8 9 0 .);
	
	#scan for bad chars..
	my $newString = "";
	for(my $i = 0; $i < length($_[0]); $i++)
	{
		
		#char to check..
		my $theChar = substr($_[0],$i,1);
		
		#check for space..
		if($theChar eq " "){next;}
			
		#check thru numbers..
		my $l = @numbers; my $sorted = 0;
		for(my $j = 0; $j < $l; $j++)
		{
			if($theChar eq $numbers[$j]){$newString = $newString . $theChar; $sorted = 1; last;}
		} if($sorted == 1){next;}
		
		#all failed..
		$newString = $newString . "0";
		
	}
	
	return $newString;
	
}

sub connectToMySQL
{
	our $host;
	our $DB_UserName;
	our $DB_Password;
	$dbh = "";
	eval
	{
	  #Connect to the database..   
	  $dbh = DBI->connect($host, $DB_UserName, $DB_Password, { RaiseError => 1 });
	};
	if($@)
	{
		if($debug == 1) {print "&error=$@";} else {print $q->header( -type => 'text/html' ); print "&error=DataBase ERROR.";}
		print "&errorCode=0";
		exit;
	} 
	else{return $dbh;}
}

sub queryMySQL #($_[0] : Database Handle, $_[1] : Query String, $_[2] : needs to be 1 to return hash)
{   
	my $sth = "";
	eval
	{ 
	  #send the query to the db..
	  $sth = $_[0]->prepare($_[1]);
  	  $sth->execute(); #use Data::Dumper; 
    };
    if($@)
    {  
		#print $q->header( -type => 'text/html' );
    	if($debug == 1) {print "&error=$@";} else {print "&error=DataBase ERROR.";} 
    	print "&errorCode=0";
    	$_[0]->disconnect(); 
    	exit;
    }
    else {if($_[2] == 1){return $sth->fetchrow_hashref();}} 	
}

sub queryMySQL_Multi #($_[0] : Database Handle, $_[1] : Query String, $_[2] : needs to be 1 to return hash)
{   
	#error test..
	 #print $_[1], "\n";
	
	my $sth = "";
	eval
	{
	  #send the query to the db..
	  $sth = $_[0]->prepare($_[1]);
  	  $sth->execute(); #use Data::Dumper; 
    };
    if($@)
    {
		#print $q->header( -type => 'text/html' );
    	if($debug == 1) {print "&error=$@";} else { print "&error=DataBase ERROR.";}
    	print "&errorCode=0";
    	$_[0]->disconnect(); 
    	exit;
    }
    else {if($_[2] == 1){return $sth;}} 	
}

#-----------------------------------------------------------------------
sub openFile #($_[0] : fileName)
{
	open FILE, "<$_[0]" or die $!;
	my @file = <FILE>;
	close FILE;
	return @file;
}
#-----------------------------------------------------------------------
sub saveFile #($_[0] : fileName, $_[1] : fileContents array reference)
{
	open FILE, ">$_[0]" or die $!; 
	print FILE @{$_[1]};
	close FILE;
}
#-----------------------------------------------------------------------
sub ArrayToString #($_[0] : array)
{
	my $fileString = "";
	foreach (@{$_[0]})
	{
		$fileString = $fileString . $_;
	}
	return $fileString;
}

#-----------------------------------------------------------------------
sub upperAndLowers #($_[0] : string)
{
	#split with ' '..
	my @bits = split(/ /, $_[0]);
	
	#create the new string..
	my $nS = "";
	foreach my $aBit (@bits)
	{
		$nS = $nS . substr(uc($aBit), 0, 1);
		$nS = $nS . substr(lc($aBit), 1) . " ";
	}
	return $nS;
}
#-----------------------------------------------------------------------
sub detaintKeepCommas #($_[0] : String) 
{      
	
	my @letters = qw(a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z _ -);
	my @numbers = qw(0 1 2 3 4 5 6 7 8 9 0 ,);
	my @chars2   = qw(` " £ $ % ^ & * ( ) _ + [ ] { } ; ' # : @ ~ \ | . / < > ? !);
	my @charKey2 = qw(&#96; &#34; &#163; &#36; &#37; &#94; &#38; &#42; &#40; &#41; &#95; &#43; &#91; &#93; &#123; &#125; &#59; &#39; &#35; &#58; &#64; &#126; &#92; &#124; &#46; &#47; &#60; &#62; &#63; &#33;);
	
	
	#scan for bad chars..
	my $newString = "";
	for(my $i = 0; $i < length($_[0]); $i++)
	{
		
		#char to check..
		my $theChar = substr($_[0],$i,1);
		
		#check for space..
		if($theChar eq " "){$newString = $newString . $theChar; next;}
		
		#check thru letters..
		my $l = @letters; my $sorted = 0;
		for(my $j = 0; $j < $l; $j++)
		{
			if($theChar eq $letters[$j]){$newString = $newString . $theChar; $sorted = 1; last;}
		} if($sorted == 1){next;}
		
		#check thru numbers..
		my $l = @numbers; my $sorted = 0;
		for(my $j = 0; $j < $l; $j++)
		{
			if($theChar eq $numbers[$j]){$newString = $newString . $theChar; $sorted = 1; last;}
		} if($sorted == 1){next;}
		
		#check thru chars..
		my $l = @chars2; my $sorted = 0;
		for(my $j = 0; $j < $l; $j++)
		{
			if($theChar eq $chars2[$j]){$newString = $newString . $charKey2[$j]; $sorted = 1; last;}
		} if($sorted == 1){next;}
		
		#all failed..
		$newString = $newString . " ";
		
	}
	
	return $newString;

}



#perl needs to know the file was loaded correctly..
1;
