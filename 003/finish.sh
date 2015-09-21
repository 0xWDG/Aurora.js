#/usr/bin/bash sh

# yeey! version
export my_Dir=$(pwd)
export bs_Dir=`basename $my_Dir`
export version="v${bs_Dir:0:1}.${bs_Dir:1:1}.${bs_Dir:2:1}"

# YEEY!
echo "                       _    _____ "
echo "                      | |  / ____|"
echo "                      | |  | (___ " 
echo "                  _   | |  \\___  \\" 
echo "   ______    _   | |__| |  ____) |"
echo "  |______|  (_)   \____/  |______/"
echo "                                  "
echo "                   Pushing:       "
echo "                            $version"

# if exists remove old files
rm GenerateDocs.php &>/dev/null

# doc builder
cp ../_.js_data/GenerateDocs.php GenerateDocs.php &>/dev/null

# Generate index.html & generate wiki -> function list.
echo "* Generating documentation"
php GenerateDocs.php &>/dev/null

echo "* Generating map files..."
# Generate sourcemapping files.
for i in *.js; 
	do java -jar ../_.js_data/compiler.jar --js ./${i} --create_source_map ./m/${i}.map --js_output_file ./m/${i}; # Show errors ;D 
done

echo "* Fixing map files"
# Add: //# sourceMappingURL=/path/to/file.js.map
for i in *.js;
	do sed -i -e '1i\'$'\n''//# sourceMappingURL='${i}'.map'$'\n' m/${i} &>/dev/null;
done

# remove temp files
echo "* Removing temp files"
cd m &>/dev/null
rm *.js-e &>/dev/null
cd .. &>/dev/null
rm GenerateDocs.php &>/dev/null

#move to master
echo "* Pushing _.js/master"
cd ..
git add . &>/dev/null
git commit -m "Auto-Pushing $version" &>/dev/null
git push &>/dev/null

echo "* Pushing _.js/wiki"
cd _.js.wiki
git add . &>/dev/null
git commit -m "Auto-Pushing $version" &>/dev/null
git push &>/dev/null

echo "* Pushing _.js/www"
cd ../_.js.www 
mkdir $bs_Dir &>/dev/null
cp ../index.html . &>/dev/null
cp $my_Dir/index.html $bs_Dir/index.html &>/dev/null
php fix.php &>/dev/null
git add . &>/dev/null
git commit -m "Auto-Pushing $version" &>/dev/null
#git push &>/dev/null
git push origin gh-pages &>/dev/null
echo "* DONE"

cd $my_Dir &>/dev/null

# GOOD.
/Applications/terminal-notifier.app/Contents/MacOS/terminal-notifier -appIcon "/Users/Wes/Cloud/WDGWV/Administatief/Logo's/logo.png" -contentImage "/Users/Wes/Cloud/Images/icons/-good.png" -title WDGWV -subtitle Success -message "Created Sourcemaps!" &> /dev/null

#Unset
unset my_Dir
unset bs_Dir
unset version