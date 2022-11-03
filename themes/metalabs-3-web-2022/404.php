<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header();

get_partial( 'layout/cursor' );

?>
<div id="error-404" class="o-page o-page--error">
    <div class="o-page__inner">
        <div class="o-header-wrapper o-header-wrapper--error-page">
            <header class="c-404 o-container">
                <i class="c-404__bg"></i>
                <div class="c-404__inner">
                    <h1 class="c-404__title u-a4 c-flickering-text u-uppercase">
                        <span class="js-404-flickering" data-enter="404" data-exit="CDIV">CDIV</span>
                    </h1>
                    <p class="c-404__description u-b0 u-fw-300">
                        Page not found, go to homepage.
                    </p>

                    <a href="<?= get_home_url() ?>" class="c-button c-button--bordered">
                        <span>
							<?= get_icon( "arrow-right" ) ?>
                        </span>
                    </a>
                </div>
            </header>
        </div>
    </div>
</div>

<?php get_footer(); ?>
