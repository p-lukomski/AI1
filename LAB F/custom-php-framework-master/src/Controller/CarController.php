<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Car;
use App\Service\Router;
use App\Service\Templating;

class CarController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $car = Car::findAll();
        $html = $templating->render('cars/index.html.php', [
            'cars' => $car,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestPost, Templating $templating, Router $router): ?string
    {
        if ($requestPost) {
            $car = Car::fromArray($requestPost);
            // @todo missing validation
            $car->save();

            $path = $router->generatePath('car-index');
            $router->redirect($path);
            return null;
        } else {
            $car = new Car();
        }

        $html = $templating->render('cars/create.html.php', [
            'cars' => $car,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $carId, ?array $requestPost, Templating $templating, Router $router): ?string
    {
        $car = Car::find($carId);
        if (! $car) {
            throw new NotFoundException("Missing post with id $carId");
        }

        if ($requestPost) {
            $car->fill($requestPost);
            // @todo missing validation
            $car->save();

            $path = $router->generatePath('car-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('cars/edit.html.php', [
            'cars' => $car,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $carId, Templating $templating, Router $router): ?string
    {
        $car = Car::find($carId);
        if (! $car) {
            throw new NotFoundException("Missing post with id $carId");
        }

        $html = $templating->render('cars/show.html.php', [
            'cars' => $car,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $carId, Router $router): ?string
    {
        $car = Car::find($carId);
        if (! $car) {
            throw new NotFoundException("Missing post with id $carId");
        }

        $car->delete();
        $path = $router->generatePath('car-index');
        $router->redirect($path);
        return null;
    }
}
