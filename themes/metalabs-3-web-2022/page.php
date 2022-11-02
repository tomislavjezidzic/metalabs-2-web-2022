<?php
// If there is no post, include home page
//wp_safe_redirect( get_home_url() );
//exit;

$template_name = 'default';
get_header();

get_partial( 'layout/loader' );
get_partial( 'layout/navigation' );
get_partial( 'layout/cursor' );

?>

<!-- PAGE WRAPPER -->
<div id="<?= $template_name ?>" class="o-page o-page--<?= $template_name ?>">
    <div id="smoothscroll-wrapper">
        <div id="smoothscroll-content">

			<?php
			get_partial( 'slice-partials/modules/_header' );
			?>

            <!-- PAGE CONTENT -->
            <div class="o-page__inner o-page__inner--<?= $template_name ?>">
				<?= bf_content(); ?>
            </div>
            <!-- //PAGE CONTENT -->
			<?php
			get_partial( 'layout/footer', [

			] );
			?>
        </div>
    </div>
</div>
<!-- //PAGE WRAPPER -->
<?php

get_footer();

?>
