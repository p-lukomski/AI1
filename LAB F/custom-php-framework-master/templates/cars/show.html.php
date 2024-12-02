<?php

/** @var \App\Model\Car $cars */
/** @var \App\Service\Router $router */

$title = "{$cars->getMake()} {$cars->getModel()} ({$cars->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= htmlspecialchars($cars->getMake()) ?> <?= htmlspecialchars($cars->getModel()) ?></h1>
    <article>
        <p><strong>Marka:</strong> <?= htmlspecialchars($cars->getMake()) ?></p>
        <p><strong>Model:</strong> <?= htmlspecialchars($cars->getModel()) ?></p>
        <p><strong>Rocznik:</strong> <?= htmlspecialchars($cars->getYear()) ?></p>
    </article>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('car-index') ?>">Powrót do listy</a></li>
        <li><a href="<?= $router->generatePath('car-edit', ['id' => $cars->getId()]) ?>">Edytuj</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
