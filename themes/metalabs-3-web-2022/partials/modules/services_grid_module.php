<?php
/**
 *
 * @var boolean $show
 *
 */

use metalabs3Web2022\acf\ACFProvider;
use metalabs3Web2022\helpers\ServiceHelper;
use metalabs3Web2022\images\ImageHelper;
use metalabs3Web2022\providers\ServiceProvider;

if ( ! empty( $show ) ) {
	$service_provider = new ServiceProvider();
	$service_helper   = new ServiceHelper();
	get_partial( 'components/modules/services-grid-module', array(
		'service_cards' => $service_helper->get_service_card( array(
			'services'     => $service_provider->get_services(),
			'acf_provider' => ACFProvider::get_instance(),
			'image_helper' => new ImageHelper(),
		) ),
	) );
}