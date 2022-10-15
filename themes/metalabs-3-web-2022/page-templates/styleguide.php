<?php
/** Template Name: Styleguide template */

$template_name = 'styleguide';
get_header();

get_partial( 'layout/loader' );
get_partial( 'layout/navigation' );

?>

<!-- PAGE WRAPPER -->
<div id="<?= $template_name ?>" class="o-page o-page--<?= $template_name ?>">

	<?php
	get_partial( 'home/header', [
		"modifier_class" => $template_name

	] );
	?>

    <!-- PAGE CONTENT -->
    <div class="o-page__inner o-page__inner--<?= $template_name ?>">
        <p class="u-a4 u-a4--roobert">
            A4

            <span class="u-a4--teodor">A4</span>
        </p>

        <p class="u-a3 u-a3--roobert">
            A3

            <span class="u-a3--teodor">A3</span>
        </p>

        <p class="u-a2 u-a2--roobert">
            A2

            <span class="u-a2--teodor">A2</span>
        </p>

        <p class="u-a1">
            A1

            <span class="u-a1--teodor">A1</span>
        </p>

        <p class="u-b0">
            B0
        </p>

        <p class="u-b1">
            B1
        </p>

        <p class="u-b2">
            B2
        </p>

        <p class="u-b3 u-b3--roobert">
            B3

            <span class="u-b3--teodor">B3</span>
        </p>

        <p class="u-b4 u-b4--roobert">
            B4

            <span class="u-b4--teodor">B4</span>
        </p>

        <div class="u-gradient-filled-270" style="width: 200px; height: 200px;">
            u-gradient-filled-270
        </div>

        <div class="u-gradient-transparent-90" style="width: 200px; height: 200px;">
            u-gradient-transparent-90
        </div>

        <div class="u-gradient-transparent-270" style="width: 200px; height: 200px;">
            u-gradient-transparent-270
        </div>
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
