#/usr/bin/bash sh

# yeey! version
export my_Dir=$(pwd)
export bs_Dir=`basename $my_Dir`
export version="v${bs_Dir:0:1}.${bs_Dir:1:1}.${bs_Dir:2:1}"
export revision=`php -r "\\\$x=file_get_contents('_.js');\\\$x=explode('this.revision = \\\\'',\\\$x);\\\$x=explode('\\\\'', \\\$x[1]);echo(substr(\\\$x[0], 1));"`
export revisionS=`php -r "\\\$x=file_get_contents('_.js');\\\$x=explode('this.revision = \\\\'',\\\$x);\\\$x=explode('\\\\'', \\\$x[1]);echo(substr(\\\$x[0], 0, 7));"`
export today=`php -r "echo 'r' . @date('ymd');"`
export uname=`whoami`
export discuss=`cat discuss`

if [ ${#revisionS} -ge 8 ]; then
	export message="_.js Cancelled Commit!"
else
	if [ -z "$1" ]; then
		export message="_.js Auto Commit [$version r$revision] $discuss"
	else
		export message="$1 [$version r$revision] $discuss"
	fi
fi

if [ "$revisionS" != "$today" ]; then #ex: r151201 (7)
	if [ ${#revisionS} -ge 8 ]; then
		echo "_.js is corrupted!!!"
		echo "(trying) to restore from backup"
		cp ar.js _.js

		$0 $1 $2 $3 $4 $5
	fi

	#echo "PLEASE UPDATE REVISION FIRST!"
	echo "read: ${revisionS}"
	echo "expected: ${today}"
	#open _.js

	#php -r "\\\$x=file_get_contents('_.js');\\\n\\\$x=preg_replace(\"/r$revision/\",\"$today\",\\\$x);\\\nfile_write_contents('_autofix.js',\\\$x);"
	#echo "php -r \"\\\$x=file_get_contents('_.js');\\\$x=preg_replace(\"/r$revision/\",\"$today\",\\\$x);file_write_contents('_autofix.js',\\\$x);\""

	cp _.js ar.js
	echo "Created backup ar.js"
	echo "Patching _.js"
	sed -e "s/r$revision/${today}/g" _.js > _.x.js
	rm _.js
	mv _.x.js _.js

	echo "Reloading script."

	$0

	exit
fi

# YEEY!
echo "                       _    _____ "
echo "                      | |  / ____|"
echo "                      | |  | (___ " 
echo "                  _   | |  \\___  \\" 
echo "   ______    _   | |__| |  ____) |"
echo "  |______|  (_)   \____/  |______/"
echo "                                  "
echo "                 Pushing:         "
echo "                  $version r$revision"
echo "Message:                          "
echo "- $message"

# if exists remove old files
rm GenerateDocs.php &>/dev/null

# doc builder
cp ../_.js.data/GenerateDocs.php GenerateDocs.php &>/dev/null

# Generate index.html & generate wiki -> function list.
echo "* Generating documentation"
php GenerateDocs.php

# if exists remove old files
rm GenerateDocs.php &>/dev/null

mkdir m &> /dev/null
echo "* Generating map files..."
# Generate sourcemapping files.

# --language_in=ES5 Fixes weird, IE<7 errors.
for i in *.js; 
	do java -jar ../_.js.data/compiler.jar --js ./${i} --create_source_map ./m/${i}.map --js_output_file ./m/${i} --language_in=ES5; # Show errors ;D 
done

echo "* Fixing map files"
# Add: //# sourceMappingURL=/path/to/file.js.map
for i in *.js;
	# WARNING will only work with mac os x version of sed
	do sed -i -e '1i\'$'\n''//# sourceMappingURL='${i}'.map'$'\n' m/${i} &>/dev/null;
done

mkdir modules &> /dev/null
cd modules
mkdir m &> /dev/null
echo "* Generating map files (Modules)..."
# Generate sourcemapping files.
for i in *.js; 
	do java -jar ../../_.js.data/compiler.jar --js ./${i} --create_source_map ./m/${i}.map --js_output_file ./m/${i} --language_in=ES5; # Show errors ;D 
done

echo "* Fixing map files (Modules)"
# Add: //# sourceMappingURL=/path/to/file.js.map
for i in *.js;
	# WARNING will only work with mac os x version of sed
	do sed -i -e '1i\'$'\n''//# sourceMappingURL='${i}'.map'$'\n' m/${i} &>/dev/null;
done
cd m
rm *.js-e &>/dev/null
cd ..
cd ..

# remove temp files
echo "* Removing temp files"
cd m &>/dev/null
rm *.js-e &>/dev/null
cd .. &>/dev/null
rm GenerateDocs.php &>/dev/null

cd .. &>/dev/null
echo "* Pushing _.js/wiki"
cd _.js.wiki
php getHistory.php &>/dev/null
git pull &>/dev/null
git add . &>/dev/null
git commit -m "$message" &>/dev/null
git push &>/dev/null
cd ..

echo "* Pushing _.js/data"
cd _.js.data
git pull &>/dev/null
git add . &>/dev/null
git commit -m "$message" &>/dev/null
git push &>/dev/null
cd ..

echo "* Pushing _.js/archive"
cd _.js.archive
git pull &>/dev/null
git add . &>/dev/null
git commit -m "$message" &>/dev/null
git push &>/dev/null
cd ..

echo "* Pushing _.js/www"
cd _.js.www 
git pull &>/dev/null
mkdir $bs_Dir &>/dev/null
cp ../index.html . &>/dev/null
cp $my_Dir/index.html $bs_Dir/index.html &>/dev/null
php fix.php
git add . &>/dev/null
git commit -m "$message" &>/dev/null
git push &>/dev/null

#move to master
echo "* Pushing _.js/master"
cd ..
git add . &>/dev/null
git commit -m "$message" &>/dev/null
git push &>/dev/null

echo "* DONE"

cd $my_Dir &>/dev/null

#Unset
unset my_Dir
unset bs_Dir
unset version
