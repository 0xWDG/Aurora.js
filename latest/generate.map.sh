# Generate sourcemapping files.
for i in *.js; 
	do java -jar /usr/local/bin/compiler.jar --js ./${i} --create_source_map ./m/${i}.map --js_output_file ./m/${i}; 
done

# Add: //# sourceMappingURL=/path/to/file.js.map
for i in *.js;
	do sed -i -e '1i\'$'\n''//# sourceMappingURL='${i}'.map'$'\n' m/${i};
done

cd m
rm *.js-e
cd ..

# GOOD.
/Applications/terminal-notifier.app/Contents/MacOS/terminal-notifier -appIcon "/Users/Wes/Cloud/WDGWV/Administatief/Logo's/logo.png" -contentImage "/Users/Wes/Cloud/Images/icons/-good.png" -title WDGWV -subtitle Success -message "Created Sourcemaps!" &> /dev/null