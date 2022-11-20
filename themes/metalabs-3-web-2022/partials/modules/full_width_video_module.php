<?php
/**
 *
 * @var boolean $show
 * @var string $anchor_id
 * @var array $video
 * @var array $video_mobile
 *
 */

use metalabs3Web2022\helpers\VideoHelper;

if ( ! empty( $show ) ) {
	$video_helper = new VideoHelper();
	$video_data   = $video_helper->get_video_data( $video );
	$desktop_url  = ! empty( $video_data['url'] ) ? $video_data['url'] : '';
	$mobile_url   = ! empty( $video_data['mobile_url'] ) ? $video_data['mobile_url'] : $desktop_url;

	get_partial( 'components/modules/full-width-video-module', array(
		'desktop_url' => $desktop_url,
		'mobile_url'  => $mobile_url,
		'anchor_id'   => $anchor_id,
	) );
}
