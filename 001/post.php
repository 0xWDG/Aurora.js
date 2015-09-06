<?php
echo "<pre>";
print_r($_POST);
echo "</pre>";
?>
<hr />
<form method="POST" action="post.php">
    <input type="text" name="test0">
    <input type="text" name="test1">
    <input type="text" name="test2">
    <input type="submit" name="completed" value="test">
</form>