<?php
/** Template Name: Styleguide template */

$template_name = 'styleguide';
get_header();

get_partial( 'layout/loader' );
get_partial( 'layout/navigation' );
get_partial( 'layout/cursor' );

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
        <br>
        <br>
        <br>
        <br>
        <br>
        <a href="">
            this is link
        </a>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

        <p class="u-a4">
            A4

            <span class="u-serif">A4</span>
        </p>

        <p class="u-a3">
            A3

            <span class="u-serif">A3</span>
        </p>

        <p class="u-a2">
            A2

            <span class="u-serif">A2</span>
        </p>

        <p class="u-a1">
            A1

            <span class="u-serif">A1</span>
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

        <p class="u-b3">
            B3

            <span class="u-serif">B3</span>
        </p>

        <p class="u-b4">
            B4

            <span class="u-serif">B4</span>
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

        <div class="u-gradient-transparent-270 u-gradient-transparent-270--animated" style="width: 200px; height: 200px;">
            u-gradient-transparent-270--animated
        </div>

        <div class="u-gradient-blur-filled-270" style="width: 200px; height: 200px;">
            u-gradient-blur-filled-270
        </div>

        <div class="u-black-blur-overlay" style="width: 200px; height: 200px;">
            u-black-blur-overlay
        </div>

        <p>
            u-gradient-blur-transparent-270
        </p>
        <div class="u-gradient-blur-transparent-270" style="width: 200px; height: 200px;">
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
