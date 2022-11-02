<?php
/**
 *
 * @var string $url
 * @var string $anchor_id
 *
 */

if ( ! empty( $url ) ) {
	$anchor = ! empty( $anchor_id ) ? 'id=' . $anchor_id : '';
    ?>
    <section class="o-section c-full-width-video-module" <?= esc_attr( $anchor ); ?>>
        <div class="o-container o-container--full-width">
            <video
                    disablePictureInPicture
                    loop
                    muted
                    playsInline
                    autoplay
                    preload="none"
                    src="<?= esc_url( $url ); ?>"
            ></video>
        </div>
    </section>
<?php } ?>