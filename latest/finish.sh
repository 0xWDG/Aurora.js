mkdir m &> /dev/null
mkdir modules &> /dev/null

# Generate sourcemapping files.
for i in *.js; 
	do java -jar ../_.js_data/compiler.jar --js ./${i} --create_source_map ./m/${i}.map --js_output_file ./m/${i} --language_in=ES5 &> /dev/null;
done

# Add: //# sourceMappingURL=/path/to/file.js.map
for i in *.js;
	do sed -i -e '1i\'$'\n''//# sourceMappingURL='${i}'.map'$'\n' m/${i} &>/dev/null;
done

rm m/*.js*e

cd modules
for i in *.js; 
	do java -jar ../../_.js_data/compiler.jar --js ./${i} --create_source_map ./m/${i}.map --js_output_file ./m/${i} --language_in=ES5 &> /dev/null; # Show errors ;D 
done

# Add: //# sourceMappingURL=/path/to/file.js.map
for i in *.js;
	do sed -i -e '1i\'$'\n''//# sourceMappingURL='${i}'.map'$'\n' m/${i} &>/dev/null;
done

rm m/*.js*e
cd ..

# GOOD.
/Applications/terminal-notifier.app/Contents/MacOS/terminal-notifier -appIcon "/Users/Wes/Cloud/WDGWV/Administatief/Logo's/logo.png" -contentImage "/Users/Wes/Cloud/Images/icons/-good.png" -title WDGWV -subtitle Success -message "Created Sourcemaps!" &> /dev/null