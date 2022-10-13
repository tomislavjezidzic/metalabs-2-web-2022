<?php

namespace bornfight\wpHelpers\providers;

use WP_Query;

class PostDataProvider {
	public function get_post_data( array $args ): array {
		$query = new WP_Query( $args );

		return $query->get_posts();
	}

	public function get_filtered_post_data( array $args ): array {
		$query = new WP_Query( $args );

		$response['posts']     = $query->get_posts();
		$response['max_pages'] = $query->max_num_pages;

		return $response;
	}

	public function get_default_params( string $post_type ): array {
		return array(
			'post_type'      => $post_type,
			'posts_per_page' => - 1,
			'post_status'    => 'publish',
		);
	}
}