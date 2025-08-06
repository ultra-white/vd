<?php

namespace App\Filament\Resources\ProductDetailsResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Group;

class DetailsRelationManager extends RelationManager
{
    protected static string $relationship = 'details';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make(2)
            ->schema([
                    Group::make()
                ->schema([
                    Textarea::make('description')
                        ->label('Описание')
                        ->rows(10)
                        ->required(),
                ]),
                    Group::make()
                ->schema([
                    TextInput::make('structure')
                        ->label('Состав')
                        ->required(),
    
                    TextInput::make('season')
                        ->label('Сезон')
                        ->required(),
    
                    TextInput::make('product_parameters')
                        ->label('Параметры изделия')
                        ->required(),
    
                    TextInput::make('model_parameters')
                        ->label('Параметры модели')
                        ->required(),
                    ])
                ])
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('path')
            ->columns([
                TextColumn::make('description')->label('Описание')->limit(30),
                TextColumn::make('structure')->label('Состав'),
                TextColumn::make('season')->label('Сезон'),
                TextColumn::make('product_parameters')->label('Изделие'),
                TextColumn::make('model_parameters')->label('Модель'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
