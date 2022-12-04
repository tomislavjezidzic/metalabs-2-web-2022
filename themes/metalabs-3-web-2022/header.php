<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 *
 * NOTICE: Don't forget to add wp_head(); to the <head> element.
 *
 * @package WordPress
 * @subpackage angelo
 */

use metalabs3Web2022\bundles\Metalabs3Web2022Assets;
use metalabs3Web2022\bundles\Metalabs3Web2022ProductionAssets;

if ( defined( 'LOCAL' ) && LOCAL === true ) {
	Metalabs3Web2022Assets::register();
} else {
	Metalabs3Web2022ProductionAssets::register();
}

$meta_labs_cookie = $_COOKIE['metalabs-3-cookie-acceptance'];
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <script>
        // Define dataLayer and the gtag function.
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        function consentGranted(action) {
            gtag('consent', action, {
                'ad_storage': 'granted',
                'analytics_storage': 'granted',
                'functionality_storage': 'granted',
                'personalization_storage': 'granted',
                'security_storage': 'granted',
            });
        }

        function consentDefault(action) {
            // Default ad_storage to 'denied'.
            gtag('consent', action, {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'denied',
            });
        }

        let metalabsCookie = '<?= ! empty( $meta_labs_cookie ) ? $meta_labs_cookie : ""; ?>';

        if (metalabsCookie) {
            consentGranted("default");
        } else {
            consentDefault("default");
        }
    </script>


	<?php
	if ( ! defined( 'LOCAL' ) ) { ?>
        <!-- Google Tag Manager -->
        <script>(function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                    'gtm.start':
                        new Date().getTime(), event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-5KMWK7K');</script>
        <!-- End Google Tag Manager -->
	<?php }  ?>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <title>
		<?= wp_title( '' ) ?>
    </title>
    <link rel="apple-touch-icon" sizes="180x180" href="<?= bu( "ui/favicon/apple-touch-icon.png" ); ?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= bu( "ui/favicon/favicon-32x32.png" ); ?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= bu( "ui/favicon/favicon-16x16.png" ); ?>">
    <link rel="manifest" href="<?= bu( "ui/favicon/site.webmanifest" ); ?>">
    <link rel="mask-icon" href="<?= bu( "ui/favicon/safari-pinned-tab.svg" ); ?>" color="#000000">
    <link rel="shortcut icon" href="<?= bu( "ui/favicon/favicon.ico" ); ?>">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#000000">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php if ( ! defined( 'LOCAL' ) ) { ?>
    <!-- Google Tag Manager (noscript) -->
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KMWK7K"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->
<?php }  ?>

