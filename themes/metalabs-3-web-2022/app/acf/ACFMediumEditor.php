<?php

namespace metalabs3Web2022\acf;

class ACFMediumEditor {
	public function init(): void {
		add_filter( 'acf/medium-editor-field/custom-buttons/key=field_635d08d9a3d83', array(
			$this,
			'add_custom_button'
		), 10, 2 );

		add_filter( 'acf/medium-editor-field/custom-buttons/key=field_635d2829f2c6b', array(
			$this,
			'add_custom_marque_button'
		), 10, 2 );
	}

	public function add_custom_button( array $buttons, array $field ): array {
		$buttons[] = array(
			'name'       => 'emphasized-text',
			'label'      => 'E',
			'attributes' => array(
				array(
					'name'  => 'class',
					'value' => 'u-serif u-fw-300'
				),
				array(
					'name'  => 'style',
					'value' => 'color:#ff0000'
				)
			),
			'tag'        => 'span',
		);

		return $buttons;
	}

	public function add_custom_marque_button( array $buttons, array $field ): array {
		$buttons[] = array(
			'name'       => 'Empty paragraph',
			'label'      => 'Empty P',
			'attributes' => array(
				array(
					'name'  => 'style',
					'value' => 'color:#ff0000'
				)
			),
			'tag'        => 'span',
		);

		$buttons[] = array(
			'name'       => 'Paragraph with class',
			'label'      => 'Paragraph',
			'attributes' => array(
				array(
					'name'  => 'class',
					'value' => 'u-serif u-fw-300'
				),
				array(
					'name'  => 'style',
					'value' => 'color:#ff0000'
				)
			),
			'tag'        => 'span',
		);

		return $buttons;
	}
}