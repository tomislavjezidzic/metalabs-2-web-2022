<?php

namespace metalabs3Web2022\acf;

class ACFDefaults {
	protected ACFMediumEditor $acf_medium_editor;

	public function __construct() {
		$this->acf_medium_editor = new ACFMediumEditor();
	}

	public function init(): void {
		$this->acf_medium_editor->init();
		$this->add_thumbnails_to_module( $this->get_modules() );
	}

	public function get_modules(): array {
		$modules_path = trailingslashit( TEMPLATE_PATH ) . 'partials/modules';

		return array_map(
			function ( string $module_path ) {
				$exploded_module = explode( '/', $module_path );

				return str_replace( '.php', '', end( $exploded_module ) );
			},
			(array) glob( "{$modules_path}/*.php" )
		);
	}

	public function add_thumbnails_to_module( array $modules ): void {
		if ( ! empty( $modules ) ) {
			foreach ( $modules as $module_name ) {
				add_filter( 'acfe/flexible/thumbnail/layout=' . $module_name, function () use ( $module_name ) {
					return bu( "module-thumbnails/$module_name.png" );
				}, 10, 3 );
			}
		}
	}
}