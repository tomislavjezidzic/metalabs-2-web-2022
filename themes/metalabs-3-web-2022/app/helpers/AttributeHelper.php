<?php

namespace metalabs3Web2022\helpers;

class AttributeHelper {
	public function format_modifiers( array $modifiers ): string {
		if ( empty( $modifiers ) ) {
			return '';
		}

		$modifier_string = '';
		foreach ( $modifiers as $modifier ) {
			// if has modifier and if modifier class isn't already added to the modifier_string
			if ( ! empty( $modifier ) && ! str_contains( $modifier_string, $modifier ) ) {
				$modifier_string .= $modifier . ' ';
			}
		}

		return $modifier_string;
	}

	public function format_data_attributes( array $attributes ): string {
		if ( empty( $attributes ) ) {
			return '';
		}

		$data_attribute = '';
		foreach ( $attributes as $attribute ) {
			$value = ! empty( $attribute['value'] ) ? $attribute['value'] : '';
			if ( empty( $value ) ) {
				continue;
			}
			if ( $attribute['is_data'] ) {
				$data_attribute .= ' data-' . $attribute['name'] . '=' . $value;
			} else {
				$data_attribute .= ' ' . $attribute['name'] . '=' . '"' . $value . '"';
			}
		}

		return $data_attribute;
	}
}