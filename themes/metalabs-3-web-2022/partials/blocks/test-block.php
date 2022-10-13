<?php
/**
 *
 * @var array $block
 *
 */

use metalabs3Web2022\acfProviders\BlocksACFDataProvider;

// Example partial
?>

<div>
	<h1><?= BlocksACFDataProvider::get_title( $block['id'] ); ?></h1>
</div>
