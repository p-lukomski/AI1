<?php

/** @var \App\Model\Car[] $cars */
/** @var \App\Service\Router $router */

$title = 'Lista Samochodów';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Lista Samochodów</h1>

    <a href="<?= $router->generatePath('car-create') ?>">Dodaj nowy samochód</a>

    <ul class="index-list">
        <?php foreach ($cars as $car): ?>
            <li>
                <h3><?= $car->getMake() ?> <?= $car->getModel() ?> (<?= $car->getYear() ?>)</h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('car-show', ['id' => $car->getId()]) ?>">Szczegóły</a></li>
                    <li><a href="<?= $router->generatePath('car-edit', ['id' => $car->getId()]) ?>">Edytuj</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
