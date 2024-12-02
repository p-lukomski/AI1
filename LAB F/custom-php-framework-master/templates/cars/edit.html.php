<?php

/** @var \App\Model\Car $cars */
/** @var \App\Service\Router $router */

$title = "Edit Car {$cars->getMake()} {$cars->getModel()} ({$cars->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= htmlspecialchars($title) ?></h1>
    <form action="<?= $router->generatePath('car-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="car-edit">
        <input type="hidden" name="id" value="<?= $cars->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('car-index') ?>">Powrót do listy</a>
        </li>
        <li>
            <form action="<?= $router->generatePath('car-delete') ?>" method="post">
                <input type="submit" value="Usuń" onclick="return confirm('Czy na pewno chcesz usunąć ten samochód?')">
                <input type="hidden" name="action" value="car-delete">
                <input type="hidden" name="id" value="<?= $cars->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
