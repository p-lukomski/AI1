<?php
    /** @var $cars ?\App\Model\Car */
?>

<div class="form-group">
    <label for="make">Marka</label>
    <input type="text" id="make" name="cars[make]" value="<?= $cars ? $cars->getMake() : '' ?>" required>
</div>

<div class="form-group">
    <label for="model">Model</label>
    <input type="text" id="model" name="cars[model]" value="<?= $cars ? $cars->getModel() : '' ?>" required>
</div>

<div class="form-group">
    <label for="year">Rocznik</label>
    <input type="number" id="year" name="cars[year]" value="<?= $cars ? $cars->getYear() : '' ?>" required>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Zapisz">
</div>

