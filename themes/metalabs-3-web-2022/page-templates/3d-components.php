<?php
/** Template Name: 3D Components template */

$template_name = 'styleguide';
get_header();

get_partial( 'layout/loader' );
get_partial( 'layout/navigation' );
get_partial( 'layout/cursor' );

?>

<!-- PAGE WRAPPER -->
<div id="<?= $template_name ?>" class="o-page o-page--<?= $template_name ?>">
    <!-- PAGE CONTENT -->
    <div class="o-page__inner o-page__inner--<?= $template_name ?>">
	    <?php
	    get_partial( 'slice-partials/modules/_header');
	    get_partial( 'slice-partials/components/3d-slider');
	    ?>
    </div>
    <!-- //PAGE CONTENT -->
	<?php
	get_partial( 'layout/footer', [

	] );
	?>

</div>
<!-- //PAGE WRAPPER -->
<?php

get_footer();

?>
