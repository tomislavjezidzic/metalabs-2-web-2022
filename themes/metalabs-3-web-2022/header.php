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

if (defined('LOCAL') && LOCAL === true) {
	Metalabs3Web2022Assets::register();
} else {
	Metalabs3Web2022ProductionAssets::register();
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <title>
		<?= wp_title('') ?>
    </title>
	<?php
    /**
     * https://realfavicongenerator.net/
     * 260x260 favicon.png required
     * update according to realfavicongenerator 22.03.2022
     *
     * $theme_color — sets main color to icon backgrounds, splash screen on PWA/some mobile browsers etc.
     */

    $theme_color = "#ffffff";
    ?>
    <link rel="apple-touch-icon" sizes="180x180" href="<?= bu("ui/favicon/apple-icon-180x180.png") ?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= bu("ui/favicon/favicon-32x32.png") ?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= bu("ui/favicon/favicon-16x16.png") ?>">
    <link rel="manifest" href="<?= bu("ui/favicon/manifest.json") ?>">
    <link rel="mask-icon" href="<?= bu("ui/favicon/safari-pinned-tab.svg") ?>" color=<?= $theme_color ?>>
    <meta name="msapplication-TileColor" content=<?= $theme_color ?>>
    <meta name="theme-color" content=<?= $theme_color ?>>

	<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>


