<?php
/**
 *
 * @var array $services
 * @var ImageHelper $image_helper
 * @var ACFProvider $acf_provider
 *
 */

use metalabs3Web2022\acf\ACFProvider;
use metalabs3Web2022\images\ImageHelper;

if ( ! empty( $services ) ) {
	foreach ( $services as $service ) { ?>
        <li class="c-services-grid-module__item">
			<?php get_partial( 'components/service-card', array(
				'title'       => get_the_title( $service ),
				'image'       => $image_helper->get_service_card_image( get_post_thumbnail_id( $service ) ),
				'description' => $acf_provider->get_field( 'description', $service ),
			) ) ?>
        </li>
	<?php }
}