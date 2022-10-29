<?php

namespace metalabs3Web2022\helpers;

class ServiceHelper {
	public function get_service_card( array $data ): string {
		if ( empty( $data ) ) {
			return '';
		}

		return get_partial( 'components/service-cards', $data, true );
	}
}