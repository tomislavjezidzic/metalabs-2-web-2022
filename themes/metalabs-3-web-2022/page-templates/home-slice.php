<?php
/** Template Name: Home SLICE template */

$template_name = 'home';
get_header();

get_partial( 'layout/loader' );
get_partial( 'layout/navigation' );
get_partial( 'layout/cursor' );

?>

<!-- PAGE WRAPPER -->
<div id="<?= $template_name ?>" class="o-page o-page--<?= $template_name ?>">

	<?php
	get_partial( 'slice-partials/modules/_header' );
	?>

    <!-- PAGE CONTENT -->
    <div class="o-page__inner o-page__inner--<?= $template_name ?>">
		<?php
		get_partial( 'slice-partials/modules/_text-module', [
			'side_text'   => 'ABOUT  US',
			'title'       => '<b>Just like the artists of the Renaissance</b> we too take pride in crafting the ultimate solutions for our clients.',
			'description' => 'We are a full-service Web3 agency focused on building the future of the internet one block at a time. Leveraging our experience and expertise, we develop and deliver superior strategic, creative, and technological solutions that transcend all expectations.',
		] );
		get_partial( 'slice-partials/modules/_full-width-video-module' );
		get_partial( 'slice-partials/modules/_text-module', [
			'side_text'   => 'SERVICES',
			'title'       => 'We offer the most <b>invigorating</b> web3 solutions and services',
			'description' => '',
		] );
		get_partial( 'slice-partials/modules/_services-grid-module' );
		get_partial( 'slice-partials/components/_3d-slider' );
		get_partial( 'slice-partials/modules/_text-module', [
			'side_text'   => 'FLOW',
			'title'       => 'Let the space become <b>the canvas</b> for bringing your best ideas to life.',
			'description' => 'From beginning to end, we are here to make sure that your Web3 experience is as enlightening as it is invigorating.',
		] );
		get_partial( 'slice-partials/modules/marque-module' );
		get_partial( 'slice-partials/modules/_text-module', [
			'side_text'   => 'MANIFESTO',
			'title'       => '<b>The Web3 Renaissance is a paradigm shift</b> that is unfolding before our very eyes wide shut.',
			'description' => 'It is a moment in time in which we can regain control of our destinies, expand our businesses and empower our communities to do much more than society is used to. The only thing we need to do is wake up and see the rejuvenation of the internet, dare to join the movement, and pick up a brush to start painting the new Web3 landscape.',
		] );
		get_partial( 'slice-partials/modules/contact-wrapper-module' );
		?>
    </div>
    <!-- //PAGE CONTENT -->
	<?php
	get_partial( 'styleguide', [
		"modifier_class" => "o-section--styleguide",
	] );
	get_partial( 'layout/footer', [

	] );
	?>

</div>
<!-- //PAGE WRAPPER -->
<?php

get_footer();

?>
