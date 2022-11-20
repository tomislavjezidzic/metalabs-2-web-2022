<?php
/**
 *
 * @var string $title (medium editor)
 * @var string $subtitle
 * @var array $model
 *
 */

if ( ! empty( $title ) && ! empty( $model ) ) { ?>
    <!-- HEADER -->
    <div class="o-section o-section--overflow">
        <header class="o-container c-header js-header">
            <h1 class="c-header__title u-a3 u-fw-500 u-uppercase js-flickering-text c-flickering-text">
				<?= wp_kses_post( $title ); ?>
            </h1>
            <div class="c-header__model js-header-model-wrapper" data-model="<?= esc_url( $model['url'] ); ?>"></div>

			<?php if ( ! empty( $subtitle ) ) { ?>
                <p class="c-header__subtitle u-a1 u-serif u-fw-300 u-uppercase">
					<?= wp_kses_post( $subtitle ); ?>
                </p>
			<?php } ?>

            <div class="c-header__arrow">
                <a href="" data-scroll-to="#content">
					<?= get_icon( 'header-arrow' ); ?>
                </a>
            </div>
        </header>
    </div>
    <!-- //HEADER -->
<?php } ?>
