<?php
/**
 *
 * @var boolean $show
 * @var array $video
 *
 */

use metalabs3Web2022\helpers\VideoHelper;

if ( ! empty( $show ) ) {
	$video_helper = new VideoHelper();
	$video_data   = $video_helper->get_video_data( $video );
	get_partial( 'components/modules/full-width-video-module', array(
		'url' => ! empty( $video_data['url'] ) ? $video_data['url'] : '',
	) );
}
