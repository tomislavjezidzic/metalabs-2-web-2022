<?php
/**
 *
 * @var string $url
 *
 */

if ( ! empty( $url ) ) { ?>
    <section class="o-section c-full-width-video-module">
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