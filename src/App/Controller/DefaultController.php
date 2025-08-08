<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;


class DefaultController extends AbstractController
{

    public function index(): Response
    {
        return $this->render(
            'app-root.html.twig'
        );
    }

    public function setupCheck(Request $request): Response
    {
        $responseContent = json_encode([
            'testParam' => $request->get('testParam')
                ? (int) $request->get('testParam')
                : null
        ]);

        return new Response(
            $responseContent,
            Response::HTTP_OK,
            ['Content-type' => 'application/json']
        );
    }

    public function getCurrencies(Request $request): JsonResponse
    {
        $url = 'https://api.nbp.pl/api/exchangerates/tables/A?format=json';

        try {
            $contextOptions = [
                'http' => [
                    'method' => 'GET',
                    'timeout' => 10,
                ]
            ];
            $context = stream_context_create($contextOptions);

            $response = @file_get_contents($url, false, $context);

            if ($response === false) {
                return $this->json([
                    'success' => false,
                    'error' => 'Coś poszło nie tak'
                ], 500);
            }

            $data = json_decode($response, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return $this->json([
                    'success' => false,
                    'error' => 'Coś poszło nie tak'
                ], 500);
            }

            $desiredCodes = ['USD', 'EUR', 'CZK', 'IDR', 'BRL'];

            $filteredRates = array_filter($data[0]['rates'], function ($rate) use ($desiredCodes) {
                return in_array($rate['code'], $desiredCodes);
            });
                
            $enhancedRates = [];

            // foreach($data[0]['rates'] as $rate){C
            foreach($filteredRates as $rate){
                $length = strlen((string)$rate['mid']) - 2;

                if(in_array($rate['code'], ['USD', 'EUR']))
                {
                    $rate['bid'] = number_format($rate['mid'] - 0.15, $length, '.', '');
                    $rate['ask'] = number_format($rate['mid'] + 0.11, $length, '.', '');
                }
                else
                {
                    $rate['bid'] = null;
                    $rate['ask'] = number_format($rate['mid'] + 0.2, $length, '.', '');
                }

                array_push($enhancedRates, [
                        'code' => $rate['code'],
                        'mid' => $rate['mid'],
                        'bid' => $rate['bid'],
                        'ask' => $rate['ask'],
                        'currency' => $rate['currency'],
                    ]
                );
            } 

            return $this->json([
                'success' => true,
                'data' => [
                        'rates' => $enhancedRates,
                        'effectiveDate' => $data[0]['effectiveDate']],
            ]);

        } catch (\Throwable $e) {
            return $this->json([
                'success' => false,
                'error' => 'Coś poszło nie tak'
            ], 500);
        }
    }

     public function getHistoricalRates(Request $request): JsonResponse
    {
        $code = $request->query->get('code');
        $end_date = $request->query->get('end_date');

        $Start_date = new \DateTime($end_date);
        $Start_date->modify('-14days');
        $start_date = $Start_date->format('Y-m-d');

        $url = 'https://api.nbp.pl/api/exchangerates/rates/A//'.$code.'//'.$start_date.'/'.$end_date.'/?format=json';

        try {
            $contextOptions = [
                'http' => [
                    'method' => 'GET',
                    'timeout' => 10,
                ]
            ];
            $context = stream_context_create($contextOptions);

            $response = @file_get_contents($url, false, $context);

            if ($response === false) {
                return $this->json([
                    'success' => false,
                    'error' => 'Coś poszło nie tak'
                ], 500);
            }

            $data = json_decode($response, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return $this->json([
                    'success' => false,
                    'error' => 'Coś poszło nie tak'
                ], 500);
            }

            $historicalRatesData = [];

            foreach($data['rates'] as $rate){

                $length = strlen((string)$rate['mid']) - 2;

                if(in_array($data['code'], ['USD', 'EUR']))
                {
                    $rate['bid'] = number_format($rate['mid'] - 0.15, $length, '.', '');
                    $rate['ask'] = number_format($rate['mid'] + 0.11, $length, '.', '');
                }
                else
                {
                    $rate['bid'] = null;
                    $rate['ask'] = number_format($rate['mid'] + 0.2, $length, '.', '');
                }

                array_push($historicalRatesData, [
                        'no' => $rate['no'],
                        'effectiveDate' => $rate['effectiveDate'],
                        'mid' => $rate['mid'],
                        'bid' => $rate['bid'],
                        'ask' => $rate['ask'],
                    ]
                );
            } 

            return $this->json([
                'success' => true,
                'data' => array_reverse($historicalRatesData)]);

        } catch (\Throwable $e) {
            return $this->json([
                'success' => false,
                'error' => 'Coś poszło nie tak'
            ], 500);
        }
    }

}
