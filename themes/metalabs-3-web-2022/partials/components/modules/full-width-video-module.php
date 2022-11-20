<?php
/**
 *
 * @var string $desktop_url
 * @var string $mobile_url
 * @var string $anchor_id
 *
 */

if ( ! empty( $desktop_url ) ) {
	$anchor = ! empty( $anchor_id ) ? 'id=' . $anchor_id : '';
	?>
    <section class="o-section c-full-width-video-module" <?= esc_attr( $anchor ); ?>
             data-anchor-target="<?= esc_attr( $anchor_id ); ?>">
        <div class="o-container o-container--full-width">
            <video
                    class="js-video"
                    data-mobile="<?= esc_url( $mobile_url ); ?>"
                    disablePictureInPicture
                    loop
                    muted
                    playsInline
                    autoplay
                    preload="none"
                    src="<?= esc_url( $desktop_url ); ?>"
            ></video>
        </div>
    </section>
<?php } ?>
