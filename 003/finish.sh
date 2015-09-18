# if exists remove old files
rm GenerateDocs.php &>/dev/null

cp ../_.js_data/GenerateDocs.php GenerateDocs.php &>/dev/null

# Generate index.html & generate wiki -> function list.
php GenerateDocs.php &>/dev/null

# Generate sourcemapping files.
for i in *.js; 
	do java -jar ../_.js_data/compiler.jar --js ./${i} --create_source_map ./m/${i}.map --js_output_file ./m/${i}; # Show errors ;D 
done

# Add: //# sourceMappingURL=/path/to/file.js.map
for i in *.js;
	do sed -i -e '1i\'$'\n''//# sourceMappingURL='${i}'.map'$'\n' m/${i} &>/dev/null;
done

cd m &>/dev/null
rm *.js-e &>/dev/null
cd .. &>/dev/null
rm GenerateDocs.php &>/dev/null

# GOOD.
/Applications/terminal-notifier.app/Contents/MacOS/terminal-notifier -appIcon "/Users/Wes/Cloud/WDGWV/Administatief/Logo's/logo.png" -contentImage "/Users/Wes/Cloud/Images/icons/-good.png" -title WDGWV -subtitle Success -message "Created Sourcemaps!" &> /dev/null