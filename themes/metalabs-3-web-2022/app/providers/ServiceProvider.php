<?php

namespace metalabs3Web2022\providers;

use bornfight\wpHelpers\providers\PostDataProvider;
use metalabs3Web2022\postTypes\types\ServicePostType;

class ServiceProvider extends PostDataProvider {
	public function get_services(): array {
		return $this->get_post_data( array(
			'post_type'      => ServicePostType::SLUG,
			'post_status'    => 'publish',
			'posts_per_page' => - 1,
			'fields'         => 'ids',
		) );
	}
}