<?php

namespace App\Filament\Resources\ProductImagesResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ImagesRelationManager extends RelationManager
{
    protected static string $relationship = 'images';

    protected static ?string $modelLabel = 'дополнительное изображение товара';
    protected static ?string $pluralModelLabel = 'изображения';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                FileUpload::make('path')
                    ->disk('public')
                    ->directory('products')
                    ->image()
                    ->preserveFilenames()
                    ->maxSize(2048)
                    ->imagePreviewHeight('200')
                    ->required()
                    ->label('Изображение'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
            TextColumn::make('id')->sortable(),
            ImageColumn::make('path')
                ->disk('public')
                ->label('Изображение'),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(), // <- ВАЖНО!
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
            ]);;
    }
}
