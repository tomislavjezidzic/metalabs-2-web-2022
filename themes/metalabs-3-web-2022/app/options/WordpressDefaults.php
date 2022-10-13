<?php

namespace metalabs3Web2022\options;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class WordpressDefaults {

	public function init(): void {
		add_filter( 'wp_image_editors', array( $this, 'wpb_image_editor_default_to_gd' ) );

		// CF fix
		add_action( 'init', array( $this, 'allow_rich_edit_cloud_front' ), 9 );
		remove_action( 'wp_head', 'wp_generator' );
		$this->add_theme_support_options();
	}

	public function add_theme_support_options(): void {
		add_theme_support( 'align-wide' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'editor-styles' );
	}

	public function wpb_image_editor_default_to_gd( $editors ): array {
		$gd_editor = 'WP_Image_Editor_GD';
		$editors   = array_diff( $editors, array( $gd_editor ) );
		array_unshift( $editors, $gd_editor );

		return $editors;
	}

	public function allow_rich_edit_cloud_front(): void {
		add_filter( 'user_can_richedit', '__return_true' );
	}
}
