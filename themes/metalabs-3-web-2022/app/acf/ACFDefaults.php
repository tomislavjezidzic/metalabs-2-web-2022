<?php

namespace metalabs3Web2022\acf;

class ACFDefaults {
	protected ACFMediumEditor $acf_medium_editor;

	public function __construct() {
		$this->acf_medium_editor = new ACFMediumEditor();
	}

	public function init(): void {
		$this->acf_medium_editor->init();
	}
}