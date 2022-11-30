<?php

use metalabs3Web2022\acf\ACFProvider;
use metalabs3Web2022\helpers\LinkHelper;

$acf_provider = ACFProvider::get_instance();
$link_helper  = new LinkHelper();
?>
    <!-- FOOTER -->
    <footer class="o-section o-section--with-padding c-footer">
        <i class="c-footer__bg u-gradient-transparent-270 u-gradient-transparent-270--animated"></i>
        <div class="o-container c-footer__inner">
            <a href="<?= get_home_url(); ?>" class="c-footer__logo">
				<?= get_icon( "logo-bw" ) ?>
            </a>

            <h3 class="c-footer__title u-a1 u-fw-300 u-serif u-uppercase">
				<?= $acf_provider->get_option_field( 'footer_-_title' ); ?>
            </h3>

			<?php if ( ! empty( $acf_provider->get_option_field( 'social_media' ) ) ) { ?>
                <ul class="c-footer__social u-b4">
					<?php foreach ( $acf_provider->get_option_field( 'social_media' ) as $social_media ) {
						$link_data = $link_helper->get_acf_link_data( $social_media['link'] );

						if ( ! empty( $link_data['url'] ) && ! empty( $link_data['label'] ) ) { ?>
                            <li>
                                <a href="<?= esc_url( $link_data['url'] ); ?>"
                                   class="u-b4 u-fw-300" <?= esc_attr( $link_data['target'] ); ?>>
									<?= esc_html( $link_data['label'] ); ?>
                                </a>
                            </li>
						<?php }
					} ?>
                </ul>
			<?php } ?>

			<?php
			$link_data = $link_helper->get_acf_link_data( $acf_provider->get_option_field( 'footer_-_privacy_link' ) );
			if ( ! empty( $link_data['url'] ) && ! empty( $link_data['label'] ) ) { ?>
                <a href="<?= esc_url( $link_data['url'] ); ?>"
                   class="c-footer__privacy u-b4 u-fw-300" <?= esc_attr( $link_data['target'] ); ?>>
					<?= esc_html( $link_data['label'] ); ?>
                </a>
			<?php } ?>
        </div>
    </footer>
    <!-- //FOOTER -->

<?php
