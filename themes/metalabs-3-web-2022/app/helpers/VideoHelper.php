<?php

namespace metalabs3Web2022\helpers;

class VideoHelper {
	public function get_video_data( array $video = array() ): array {
		if ( empty( $video ) ) {
			return array();
		}

		return match ( $video['type'] ) {
			'upload' => array(
				'url' => ! empty( $video['upload'] ) && ! empty( $video['upload']['url'] ) ? $video['upload']['url'] : '',
				'mobile_url' => ! empty( $video['mobile_upload'] ) && ! empty( $video['mobile_upload']['url'] ) ? $video['mobile_upload']['url'] : '',
			),
			'url' => array(
				'url' => ! empty( $video['url'] ) ? $video['url'] : '',
				'mobile_url' => ! empty( $video['mobile_url'] ) ? $video['mobile_url'] : '',
			),
			default => array(),
		};

	}
}
